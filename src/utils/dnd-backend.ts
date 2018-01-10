import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

export const dndContext = DragDropContext(HTML5Backend);
export const dndTypes = {
  ITEM_ICON: 'ITEM_ICON',
  ITEM_BLOCK: 'ITEM_BLOCK',
};
