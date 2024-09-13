import ConvertDataToBr from "../../classes/ConvertDataToBr";
import { Box, Checkbox, Chip, IconButton, ListItem, ListItemText, Tooltip } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check'
import PendingIcon from '@mui/icons-material/Pending'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Status from "../../enum/status";

const ListaDeItens  = (props) => {
         const {todo, index, handleEdit, handleStatus, handleDelete} = props;
    return (
        <ListItem
        key={index}
        style={{ textDecoration: todo.status === Status.concluido ? 'line-through' : 'none' }}
        secondaryAction={
          <>
          <Tooltip title="Editar Tarefa">
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remover Tarefa">
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      >
        <Box sx={{
          display :'grid',
          gridTemplateColumns : '1fr 2fr 1fr',
          justifyItems: 'stretch'
        }}>
             <ListItemText>
              <Checkbox  onChange={() => handleStatus(index)}>
                  {todo.status === Status.concluido  ? <PendingIcon /> : <CheckIcon />}
                </Checkbox>
             </ListItemText>
              <ListItemText sx={{
                  width : '200px',
                  marginRight : '10px'
              }}>{todo.titulo}</ListItemText>
              <ListItemText>{ConvertDataToBr(todo.data)}</ListItemText>
              <ListItemText>
                <Chip
                  color={todo.status === Status.pendente ? 'warning' :  'success'}
                  label={
                    <span>
                      <b>Status:</b> {todo.status}
                    </span>
                  }
                  icon={todo.status === Status.concluido ? <CheckIcon fontSize="small" /> : <PendingIcon fontSize="small" />} />
              </ListItemText>
          </Box> 
      </ListItem>
    )
}

export default ListaDeItens;