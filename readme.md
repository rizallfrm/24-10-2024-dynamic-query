![My Image](/public/images/db-diagram.png)


### API Hit for Paginated Data
1. **Limit**: Controls the number of records per page.
2. **Page**: Specifies which page of results you want to fetch.
----
For example, if you want to limit the results to 5 products per page and fetch different pages:
- **Products**: {{base_url}}/products?page=1&limit=5
- **Users**: {{base_url}}/users?page=1&limit=5
- **Shops**: {{base_url}}/shops?page=1&limit=5
---
### API Documentation
[Visit API Documentation](https://documenter.getpostman.com/view/38660052/2sAY4shPRj)