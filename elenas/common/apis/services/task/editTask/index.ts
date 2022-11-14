import { taskType } from '../../../types/task/taskType';
import authHttp from '@common/http/authHttp';

const editTask = async (data: taskType): Promise<taskType> =>
    (await authHttp.put(`${process.env.ELENAS_API}/task/${data.pk}/`, data)).data;

export default editTask;
