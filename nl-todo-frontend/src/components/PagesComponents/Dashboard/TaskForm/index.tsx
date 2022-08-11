import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AxiosResponse } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Task } from '../../../../models/Task';
import { TasksService } from '../../../../services/Task';
import { showSnackbarAlert } from '../../../../store/slicers/snackbarAlert.slicer';
import { responseStatus } from '../../../../utils/constants';
import { taskValidations } from '../../../../utils/form-validations';
import ControlledCheckbox from '../../../Basics/ControlledCheckbox';
import ControlledTextField from '../../../Basics/ControlledTextField';
interface Props {
  editionTask: Task | undefined;
  formSubmit: () => void;
  formCancel: () => void;
}

function TaskForm({ editionTask, formSubmit, formCancel }: Props) {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: editionTask?.id ? editionTask : {},
    resolver: yupResolver(taskValidations),
  });

  const onSubmit: SubmitHandler<Task> = async (data: Task) => {
    let response: AxiosResponse | undefined;
    if (data?.id) {
      response = await TasksService.updateTask(data);
    } else {
      response = await TasksService.createTask(data);
    }

    let success = response?.status && responseStatus.SUCCESS.includes(response?.status);
    dispatch(
      showSnackbarAlert({
        snackbarData: {
          title: success ? 'Sucesso' : 'Erro',
          message: success ? 'Registro salvo!' : 'Houve um erro ao processar a sua solicitação',
          type: success ? 'success' : 'error',
        },
      })
    );

    formSubmit();
  };

  const handleClose = () => {
    formCancel();
  };

  return (
    <Dialog open={true} onClose={handleClose} aria-labelledby="responsive-dialog-title" fullWidth>
      <DialogTitle variant="h5" color="secondary">
        {editionTask?.id ? 'Editar' : 'Nova'}
        {' Tarefa'}
      </DialogTitle>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ControlledTextField control={control} name="title" label="Nome" errorMessage={errors.title?.message} />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                control={control}
                label="Descrição"
                name="description"
                errorMessage={errors.description?.message}
                minRows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledCheckbox
                control={control}
                label="Concluída"
                name="completed"
                defaultChecked={editionTask?.completed ? true : false}
                errorMessage={errors.description?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ mx: 2, my: 1 }}>
          <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
            Salvar
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TaskForm;
