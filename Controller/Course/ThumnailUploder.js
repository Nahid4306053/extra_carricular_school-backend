const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage")
const app = require('../../firebase/firebase.config')

const ThumnailUploder = async (req, res, next) => {
  if (req.files.length > 0) {
    const storage = getStorage()
    const storageref = ref(storage, 'courseThumnail/');
    const snapshort = await uploadBytes(storageref, req.files[0]);
    const urls = await getDownloadURL(snapshort.ref);
    console.log(urls);
  }

}
 
module.exports = ThumnailUploder;
