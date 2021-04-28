function getUpdatedItems(prev, curr) {
  return curr.filter(
    (currVal) =>
      !prev.find(
        (prevVal) =>
          prevVal.isbn_13 === currVal.isbn_13 &&
          prevVal.store_id === currVal.store_id &&
          prevVal.stock === currVal.stock
      )
  );
}

function getDeletedItems(prev, curr) {
  const deletedInventories = prev.filter(
    (prevVal) =>
      !curr.find(
        (currVal) =>
          prevVal.isbn_13 === currVal.isbn_13 &&
          prevVal.store_id === currVal.store_id &&
          prevVal.stock === currVal.stock
      )
  );
  return deletedInventories.map((inventory) => ({ ...inventory, stock: 0 }));
}

module.exports = async (db, wss) => {
  const { rows } = await db.inventories.index();
  let prevInventory = rows;

  setInterval(async () => {
    try {
      const { rows } = await db.inventories.index();
      const currInventory = rows;
      const updatesToSend = [];

      updatesToSend.push(...getUpdatedItems(prevInventory, currInventory));
      updatesToSend.push(...getDeletedItems(prevInventory, currInventory));
      prevInventory = currInventory;
      if (updatesToSend.length) {
        wss.broadcast = function () {
          wss.clients.forEach((client) => client.send(updatesToSend));
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, 1000 * 60);
  return "hey";
};
