import {
  getNodeEntry,
  TEditor,
  TElement,
  TNodeEntry,
  Value,
} from '@udecode/plate-core';
import { Path } from 'slate';

export const getCellInNextTableRow = <V extends Value>(
  editor: TEditor<V>,
  currentRowPath: Path
): TNodeEntry | undefined => {
  try {
    const nextRow = getNodeEntry<TElement>(editor, Path.next(currentRowPath));
    // TODO: Many tables in rich text editors (Google Docs, Word),
    // add a new row if we're in the last cell. Should we do the same?
    const [nextRowNode, nextRowPath] = nextRow;
    const nextCell = nextRowNode?.children?.[0];
    const nextCellPath = nextRowPath.concat(0);
    if (nextCell && nextCellPath) {
      return getNodeEntry(editor, nextCellPath);
    }
  } catch (err) {}
};
