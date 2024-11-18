function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
function fieldCleanUp(fields, obj) {

  if (obj == null) throw new Error("null");
  if (Array.isArray(obj)) { obj = obj[0]; }
  if (obj == null) throw new Error("null");

  for (var key in obj) {
    let plzBeTrue = false;
    fields.forEach((field) => { if (field === key) plzBeTrue = true; });
    if (!plzBeTrue) {
      delete obj[key];
    }
  }
  return obj;
}
module.exports = { generateUUID, fieldCleanUp };
