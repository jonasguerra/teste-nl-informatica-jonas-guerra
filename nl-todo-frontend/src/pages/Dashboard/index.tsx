import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DialogWithActions from '../../components/Basics/DialogWithActions';
import TaskForm from '../../components/PagesComponents/Dashboard/TaskForm';
import DashboardNavbar from '../../components/PagesComponents/Navbar';
import EnhancedTableHead, { HeadCell, Order } from '../../components/PagesComponents/TableHeader';
import { Task } from '../../models/Task';
import { TasksService } from '../../services/Task.service';
import { showSnackbarAlert } from '../../store/slicers/snackbarAlert.slicer';
import { responseStatus } from '../../utils/constants';
import { getFullDate } from '../../utils/methods';
import { PageContainer, PageHeader, PageTitle, TableCellFixed } from './styles';

const headCells: HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    label: 'Título',
  },
  {
    id: 'description',
    numeric: false,
    label: 'Descrição',
  },
  {
    id: 'createdAt',
    numeric: false,
    label: 'Criado em',
  },
  {
    id: 'completed',
    numeric: false,
    label: 'Finalizada',
  },
  {
    id: 'actions',
    numeric: false,
    label: 'Ações',
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Task>('createdAt');
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [editionTask, setEditionTask] = useState<Task | undefined>(undefined);

  const [showEditionForm, setShowEditionForm] = useState<boolean>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFormOpen = (task?: Task) => {
    if (task) {
      setEditionTask(task);
    }
    setShowEditionForm(true);
  };

  const handleFormClose = () => {
    setEditionTask(undefined);
    setShowEditionForm(false);
  };

  const handleFormSubmit = () => {
    setEditionTask(undefined);
    setShowEditionForm(false);
    fetchData();
  };

  const handleDelete = (task: Task) => {
    setShowDeleteForm(true);
    setEditionTask(task);
  };

  const handleDeleteClose = () => {
    setShowDeleteForm(false);
    setEditionTask(undefined);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteForm(false);
    if (editionTask?.id) {
      const response = await TasksService.deleteTask(editionTask.id);
      let success = response?.status && responseStatus.SUCCESS.includes(response?.status);
      dispatch(
        showSnackbarAlert({
          snackbarData: {
            title: success ? 'Sucesso' : 'Erro',
            message: success ? 'Registro excluído!' : 'Houve um erro ao processar a sua solicitação',
            type: success ? 'success' : 'error',
          },
        })
      );
    }
    setEditionTask(undefined);
    fetchData();
  };

  const fetchData = async () => {
    const response = await TasksService.getTasks();
    if (response) {
      setTotalItems(response.data.length);
      setTasks(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <DashboardNavbar />
      <PageContainer>
        <Card>
          <PageHeader>
            <PageTitle>Suas notas</PageTitle>
            <Button variant="contained" onClick={() => handleFormOpen()}>
              Nova Nota
            </Button>
          </PageHeader>
          {!loading && (
            <TableContainer>
              <Table>
                <EnhancedTableHead headCells={headCells} order={order} onRequestSort={() => {}} />
                <TableBody>
                  {tasks?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task: Task) => (
                    <TableRow hover key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{getFullDate(task.createdAt)}</TableCell>
                      <TableCell>{task.completed ? <CheckIcon /> : <CloseIcon />}</TableCell>
                      <TableCellFixed>
                        <IconButton>
                          <EditIcon onClick={() => handleFormOpen(task)} />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(task)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCellFixed>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={totalItems}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}
        </Card>
      </PageContainer>
      {showEditionForm && (
        <TaskForm editionTask={editionTask} formSubmit={handleFormSubmit} formCancel={handleFormClose} />
      )}
      {showDeleteForm && (
        <DialogWithActions
          title="Excluir Nota"
          message={`Deseja excluir a nota: ${editionTask?.title}?`}
          onConfirm={() => handleDeleteConfirm()}
          onCancel={() => handleDeleteClose()}
        />
      )}
    </>
  );
};

export default Dashboard;
