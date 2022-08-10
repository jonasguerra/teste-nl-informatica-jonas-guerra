import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import EnhancedTableHead, {
  HeadCell,
  Order,
} from "../../components/PagesComponents/TableHeader";
import { Task } from "../../models/Task";
import { TasksService } from "../../services/Task.service";
import { PageContainer, PageHeader, PageTitle, TableCellFixed } from "./styles";

const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: false,
    label: "Id",
  },
  {
    id: "title",
    numeric: false,
    label: "Título",
  },
  {
    id: "description",
    numeric: false,
    label: "Descrição",
  },
  {
    id: "createdAt",
    numeric: false,
    label: "Criado em",
  },
  {
    id: "actions",
    numeric: false,
    label: "Actions",
  },
];

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Task>("createdAt");
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchData = async () => {
    const response = await TasksService.getTasks();
    setTasks(response?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Dashboard</PageTitle>
        <Button variant="contained">Nova Nota</Button>
      </PageHeader>
      {!loading && (
        <Card>
          <CardContent>
            <TableContainer>
              <Table>
                <EnhancedTableHead headCells={headCells} order={order} />
                <TableBody>
                  {tasks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((task: Task) => {
                      return (
                        <TableRow hover key={task.id}>
                          <TableCell>{task.title}</TableCell>
                          <TableCellFixed>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                            <IconButton>
                              <ArrowForwardIcon />
                            </IconButton>
                          </TableCellFixed>
                        </TableRow>
                      );
                    })}
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
          </CardContent>
        </Card>
      )}
    </PageContainer>
  );
};

export default Dashboard;
