import { useState } from "react"
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd"
import { StrictModeDroppable } from "./StrictModeDroppable"

const listItems = [
  {
    id: "1",
    name: "loyd",
  },
  {
    id: "2",
    name: "karen",
  },
  {
    id: "3",
    name: "ben",
  },
  {
    id: "4",
    name: "valdez",
  },
]

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  border: isDragging && "1px solid green",
  ...draggableStyle,
})

function App() {
  const [lists, setLists] = useState(listItems)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const items = Array.from(lists)
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)
    setLists(items)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="stages" direction="horizontal">
        {(provided) => (
          <section
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="container"
          >
            {lists.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="item"
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.name}
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </section>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  )
}

export default App
