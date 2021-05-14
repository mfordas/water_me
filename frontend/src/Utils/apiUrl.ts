export const apiUrl = () => {
    if (process.env.REACT_APP_NODE_ENV === 'development') {
        return 'http://localhost:8080/';
    } else if (
        process.env.REACT_APP_NODE_ENV === 'test' ||
    process.env.NODE_ENV === 'test'
    ) {
        return 'http://localhost/';
    } else if (process.env.REACT_APP_NODE_ENV === 'production') {
        return 'http://localhost/';
    } else {
        return 'http://node-server:8080/';
    }
};
