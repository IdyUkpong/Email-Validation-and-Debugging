import FileTree from "./fileTree";

export function createFileTree(input) {
  input.sort((a, b) => {
    return a.id - b.id;
  });
  input[0].parentId = 0;

  const fileTree = new FileTree();

  for (const inputNode of input) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}
