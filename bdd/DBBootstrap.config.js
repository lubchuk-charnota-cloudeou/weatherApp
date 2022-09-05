module.exports = {
      retrieveCity: (params) => `
  update city
  set processing=true
  updated_date=now()
  where id = (
      select id
      from city
      where not processing
      and not processed
      and env=${params.bddEnv}
      limit 1
  ) returning *;
  `
}