import { taskType } from '../../../types/task/taskType';
import authHttp from '@common/http/authHttp';

const newTask = async (data: taskType): Promise<taskType> =>
    (await authHttp.post(`${process.env.ELENAS_API}/task/`, data)).data;

export default newTask;
