import uploadToB2 from "./utils/uploadToB2.js";

uploadToB2("./test.txt", "test/text.txt", "text/plain")
    .then((key) => console.log("uploaded", key))
    .catch((err) => console.log(err));
