const fs = window.require("fs");
const path = window.require("path");
const electron = window.require("electron");
const _ = window.require("lodash/core");

const userDataPath = path.join(
  (electron.app || electron.remote.app).getPath("userData"),
  "data.json"
);

if (!fs.existsSync(userDataPath)) {
  fs.writeFileSync(userDataPath, JSON.stringify({ data: [] }), (error) => {
    console.log(error);
  });
}

const postData = (payload) => {
  const data = readData();
  data.push(payload);
  const newData = { data: data };
  fs.writeFileSync(userDataPath, JSON.stringify(newData), (error) => {
    console.log(error);
  });
};

const deleteData = (payload) => {
  const data = readData();
  const newData = {
    data: data.filter((item) => item.id !== payload.id),
  };
  fs.writeFileSync(userDataPath, JSON.stringify(newData), (error) => {
    console.log(error);
  });
};

const readData = () => {
  const data = JSON.parse(fs.readFileSync(userDataPath))["data"];
  return data;
};

exports.postData = postData;
exports.readData = readData;
exports.deleteData = deleteData;
