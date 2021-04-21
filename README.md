This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App Features

### Conditional Logic and JavaScript Array Methods

This app uses conditional logic and JavaScript array methods to sort throught he Amiibo API and return the relevant information in cards. This code can be found in the [Amiibo.js](/src/Content/Amiibo/Amiibo.js) file.

### Function-based Amiibo Component

This app imports a .json file containing information about all the Amiibos ever realeased and displays the figure's name, game, series, and date of release in North America. The Amiibos are sorted by game.

### Using the useEffect Hook

The primary location of my useEffect code is in the [Amiibo.js](/src/Content/Amiibo/Amiibo.js) file.

### Using the useContext Hook

The primary location of my useContext code is in the [signContext.js](/src/contexts/signContext.js) file and it is then imported to the [Email.js](/src/Content/Email/Email.js) file.

### Using the useState Hook

My useState code is used in the [signContext.js](/src/contexts/signContext.js), [Amiibo.js](/src/Content/Amiibo/Amiibo.js), and [Email.js](/src/Content/Email/Email.js) files.

### User Input and Form Validation

This app uses Formik and Material UI in order to get user input and validate the information given in the form of a subcription box. This code can be found in the [Email.js](/src/Content/Email/Email.js) file.

### Custom Components

The custom components used in this app are [Amiibo.js](/src/Content/Amiibo/Amiibo.js), [ButtonAppBar.js](/src/Content/Bar/ButtonAppBar.js), [Contact.js](/src/Content/Contact/Contact.js), [Email.js](/src/Content/Email/Email.js), [Header.js](/src/Content/Header/header.js), and [Home.js](/src/Content/Home/Home.js).

### React Router

React Router is used for the routing of this app. <code>Route</code> can be found in the [Content.js](/src/Content/Content.js) component. <code>Link</code> can be found in the [ButtonAppBar.js](/src/Content/Bar/ButtonAppBar.js) component.

### Hosted on Netlify

This app is hosted on Netlify and can be found at [https://dazzling-tereshkova-66bc33.netlify.app/](https://dazzling-tereshkova-66bc33.netlify.app/)

### Server hosted on Heroku

The API is hosted on Heroku at [https://dgm-4790-server.herokuapp.com/](https://dgm-4790-server.herokuapp.com/)

### GET endpoint

On the backend:

```
export const amiibos = async (req, res) => {
    const amiibos = await Amiibo.find()
    if (!amiibos) {
        return res.status(400).json({Message: `No amiibos found`})
    }
    res.json(amiibos)
}
```

On the frontend:

```
const fetchData = async () => {
    const response = await axios.get(apiURL);
    setAmiibos(response.data);
};
```

### PUT endpoint

On the backend:

```
export const updateAmiibo = async (req, res) => {
    const amiiboId = req.body.data.amiiboId
    const updatedObj = {
        name: req.body.data.name,
        game: req.body.data.game,
        release: req.body.data.release,
        id: req.body.data._id
    }
    try {
        const amiibo = await Amiibo.findByIdAndUpdate(amiiboId, updatedObj, { new: true})
        res.status(200).json(amiibo)
    } catch (err) {
        res.status(400).json({Message: `Could not update: ${err}`})
    }
}
```

On the frontend:

```
const handleUpdate = async (values) => {
    console.log(selectedAmiibo._id);
    try {
      console.log("working");
      const result = await axios.put(`${apiURL}/update`, {
        data: {
          name: values.name,
          game: values.game,
          release: values.release,
          amiiboId: selectedAmiibo._id,
        },
      });
      console.log(result);
      if (result.status === 200) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
};
```

### POST endpoint

On the backend:

```
export const addAmiibo = ((req, res) => {
    const amiibo = new Amiibo({
        name: req.body.name,
        game: req.body.gameSeries,
        image: req.body.image,
        id: req.body.tail,
        release: req.body.release.na
    })
    console.log(amiibo)
    amiibo.save()
    res.json(amiibo)
})
```

On the frontend:

```
const handlePostNewAmiibo = async () => {
    setPostAmiibo()
    try {
      await axios.post(`${apiURL}/`, {
        name: postAmiibo.name,
        game: postAmiibo.game,
        image: postAmiibo.image,
        id: postAmiibo.id,
        release: postAmiibo.release,
      });
    } catch (error) {
      console.log(error);
    }
    fetchData();
};
```

### DELETE endpoint

On the backend:

```
export const deleteAmiibo = async (req, res) => {
    console.log(req.body)
    const amiiboId = req.body.amiiboId
    try {
        const deletedAmiibo= await Amiibo.findByIdAndRemove(amiiboId)
        if (!deletedAmiibo) {
            return res.status(400).json({Message: `Amiibo to delete not found.`})
        }
        console.log(`Deleted the Amiibo: ${deletedAmiibo}`)
        res.sendStatus(200)
    } catch (err) {
        res.status(400).json({Message: `Invalid ID: ${err}`})
    }
}
```

On the frontend:

```
const handleDelete = async () => {
    setDeleteOpen(false);
    console.log(selectedAmiibo._id);
    try {
      await axios.delete(`${apiURL}/delete`, {
        data: {
          amiiboId: selectedAmiibo._id,
        },
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
    console.log(selectedAmiibo._id);
};
```
