function catchAsync(func) {
    return function (req, res, next) {

        Promise
            .resolve(func(req, res, next))
            .catch(next);
    }
}
export default catchAsync;