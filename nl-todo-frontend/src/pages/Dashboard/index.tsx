import { Button, Card, CardContent, IconButton, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from 'react';
import EnhancedTableHead, { Order } from "../../../components/Basics/TableHeader";
import { HeadCell } from '../../components/TableHeader';
import { Task } from '../../models/task';
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

  const [loading, setLoading] = useState<boolean>(false) 
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Task>("createdAt");
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setLoading(false)

    
  }, [])


  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Dashboard</PageTitle>
        <Button>Nova Nota</Button>
      </PageHeader>
      {!loading && (
        <Card>
          <CardContent>
                        <TableContainer>
                          <Table>
                            <EnhancedTableHead
                              headCells={headCells}
                              order={order}
                            />
                            <TableBody>
                              {taskList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((task: Connection) => {
                                  return (
                                    <TableRow hover key={task.id}>
                                      <TableCell>{task.name}</TableCell>
                                      <TableCellFixed>
                                        <IconButton>

                                        </IconButton>
                                          variant="text"
                                          title="Connect domains"
                                          color="secondary"
                                          startIcon={<AddIcon />}
                                        />
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
      </PageContainer>
  );
};

export default Dashboard;
