import { taskType } from '../../../types/task/taskType';
import { list } from '../../../types/list';
import authHttp from '@common/http/authHttp';

const getTasks = async (): Promise<list<taskType>> =>
    (await authHttp.get(`${process.env.ELENAS_API}/task`)).data;

export default getTasks;
