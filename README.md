<h1 align="center"> Data Generator </h1>

<br>
<p align="center"> <b> Generate data to aid your development experience </b> </p>
<br>

# Setup is easy!

<details>
<summary><strong>with npm</strong></summary>

Install dependencies:

```
npm install
```

To generate data for one tenant, use:
```
npm run generate
```

For multiple tenants, pass the number of tenants as an argument: 

```
npm run generate -- --num=15
```

A folder `data` is created in the current directory. It will hold the json file(s) with tenant information.

</details>

<details>
<summary><strong>with yarn</strong></summary>

Install dependencies:

```
yarn
```

To generate data for one tenant, use:
```
yarn generate
```

For multiple tenants, pass the number of tenants as an argument: 

```
yarn generate --num=15
```

A folder `data` is created in the current directory. It will hold the json file(s) with tenant information.
</details>
