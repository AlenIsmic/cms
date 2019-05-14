export const routes = {
    login:
        {
            path: '/login'
        },
    news:
        {
            path: '/news'
        }
};

export function redirect(history, route){
    history.push(route);
}
