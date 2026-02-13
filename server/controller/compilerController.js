import executeCpp from "../compiler/executeCpp.js";
import generateFile from "../compiler/generateFile.js";
import generateInputFile from "../compiler/generateInputFile.js";


const handleCompileRequest = async (req, res) => {

  const { language = 'cpp', code, customInput } = req.body;
  if (code === undefined) {
    return res.status(404).json({ error: "Code is required" });
  }

  const input = customInput || "";

  try {
    const filePath = generateFile(language, code);
    const inputFilePath = generateInputFile(input);
    const output = await executeCpp(filePath, inputFilePath);
    res.json({ filePath, output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

export { handleCompileRequest };