var API_URL = "http://localhost:3000"
if (process.env.NODE_ENV === "production") {
  API_URL = "http://dev.mylivingcity.org/api"
}

module.exports = API_URL
