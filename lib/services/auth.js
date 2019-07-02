// gives us access to our auth0
const { ManagementClient } = require('auth0');

// go to auth0, return the users list (variables from auth0.com)
const managementClient = new ManagementClient({
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'read:users'
});
////
const parseUser = user => ({
  email: user.email,
  name: user.nickname,
  id: user.user_id,
  image: user.picture
});

const getUser = id => {
// use management client api to get a user (by id)
  return managementClient.getUser({ id })
    .then(parseUser);
};

// give an array of ids, send a "q" auth0 query and 
// give it list of all ids separated by OR
// return all users where the id matches any in our array

const getUsers = ids => {
  return managementClient.getUsers({
    q: `user_id: ${ids.join(' OR ')}`
  })
    .then(users => users.map(parseUser));
};

// return list of users for all docs in DB,
// then insert the users into those docs
const joinUsers = async(models, field = 'user') => {
  // get user ids      data type that removes duplicates
  const usersId = [...new Set(models.map(model => model[field]))];
  // use auth0 to fetch user profiles
  const users = await getUsers(usersId);

  // inject the id'd user into the model
  // grab first user where user's id(was sub)  = original model field
  const modelsWithUsers = models.map(model => ({
    ...model.toJSON(),
    [field]: users.find(user => user.id === model[field])
  }));
  // was: 
  // [field]: users.find(user => user.user.id === model[field])
  // [field]: users.find(user => user.user.sub === model[field])
  // [field]: users.find(user => user.sub === model[field])

  // return all models with users (creators) populated
  return modelsWithUsers;
};

module.exports = {
  getUser,
  getUsers,
  joinUsers
}
