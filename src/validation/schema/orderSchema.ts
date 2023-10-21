export const orderSchema = {
  customer: { type: "string", min: 1 },
  order: {
    type: "object",
    strict: true,
    props: {
      milk: { type: "number", positive: true },
      skins: { type: "number", positive: true },
    },
  },
  $$strict: true,
};
