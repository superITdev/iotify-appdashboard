cube(`Users`, {
  sql: `SELECT * FROM public.users`,

  measures: {
    count: {
      sql: `id`,
      type: `count`
    }
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },

    // state: {
    //   sql: `state`,
    //   type: `string`
    // },
    state: {
      sql: `city`,
      type: `string`
    },

    city: {
      sql: `city`,
      type: `string`
    },

    signedUp: {
      sql: `created_at`,
      type: `time`
    },

    companyName: {
      sql: `company_name`,
      type: `string`
    }
  }
});
