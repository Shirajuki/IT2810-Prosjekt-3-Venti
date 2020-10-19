const graphql = require("graphql");
const MakeupModel = require("../mongo-models/makeup")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

var makeupType = new GraphQLObjectType({
  name: "makeup",
  fields: function () {
    return {
      id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      brand: {
        type: GraphQLString
      },
      image: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      product_colors: {
        type: GraphQLList
      },
    }
  }
});

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      makeup: {
        type: new GraphQLList(makeupType),
        resolve: function () {
          const products = MakeupModel.find().exec()
          if (!products) {
            throw new Error('Error')
          }
          console.log(products);
          return products
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({query: queryType});

