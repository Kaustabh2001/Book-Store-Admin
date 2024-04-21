const message = {
    ok: "Everything is fine",
    error: "Something went wrong"
};
  
const status = {
    ok: 200,
    badRequest: 400,
    notFound: 404,
    internalError: 500
};
  

module.exports = { message, status };