function index(req, res) {
  res.json({
    message: 'Welcome to Talent-Network!',
    documentation_url: 'https://github.com/sf-wdi-labs/talent-network',
    baseUrl: "https://fierce-atoll-30421.herokuapp.com", 
    base_url: 'localhost:3000',
    endpoints: [
      {
        method: 'GET', path: '/api', description: 'Describes available endpoints'

      }
    ]
  });
}

module.exports = {
  index: index
}
