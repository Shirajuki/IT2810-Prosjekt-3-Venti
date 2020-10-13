const graphql = require("graphql");
const makeup = require("../mongo-models/makeup");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const makeupType = new GraphQLObjectType({
  name: "makeups",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    brand: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
    },
    rating: {
      product_type: GraphQLFloat,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    makeups: {
      type: makeupType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return makeup.findByString(args.id);
      },
    },
    makeups: {
      type: new GraphQLList(makeupType),
      resolve(parent, args) {
        return makeup.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addmakeup: {
      type: makeupType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        image: {
          type: new GraphQLNonNull(GraphQLString),
        },
        product_type: {
          type: new GraphQLNonNull(GraphQLString),
        },
        brand: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        let makeup = new makeup({
          name: args.name,
          image: args.image_link,
          brand: args.brand,
          product_type: args.product_type,
        });
        return makeup.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
