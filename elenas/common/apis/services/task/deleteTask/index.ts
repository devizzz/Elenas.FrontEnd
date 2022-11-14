import authHttp from '@common/http/authHttp';

const deleteTask = async (pk: number): Promise<void> =>
    (await authHttp.delete(`${process.env.ELENAS_API}/task/${pk}/`));

export default deleteTask;
