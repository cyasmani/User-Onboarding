import React, {useState, useEffect} from 'react'
import "../styles/form.css"
import * as Yup from 'yup'
import axios from 'axios'


function Form() {

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        terms:''
    })

    const [users, setUsers] = useState([]);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        terms:true
        
    })

    const validateChange = e =>{
        Yup.reach(validationSchema, e.target.name)
        .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
        .then((value) => {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });

        })
        .catch((err) => {
            console.log(err);
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            })
        })
        
    }

    const onSubmit = e => {
        e.preventDefault();
        axios
        .post("https://reqres.in/api/users", formData)
        .then((res) => {
          console.log("success!", res.data);
          // update temp state with value from API to display in <pre>
          setUsers(res.data);
  
          // if successful request, clear any server errors
         // see step 7 in notion notes
  
          // clear state, could also use a predetermined initial state variable here
          setFormData({
            name: "",
            email: "",
            motivation: "",
            positons: "",
            terms: true
          });
        })
        
    
    }
    
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required').min(6, "Must be at least 6 characters"),
        email: Yup.string().email("invalid email format").required('Required'),
        password: Yup.string().required('Required').min(6, "Must be at least 7 characters"),
        terms: Yup.boolean().oneOf([true], "Please agree to terms")
    })

    const inputChange = e =>{
        e.persist();


        const newFormData ={
            ...formData,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        }
        validateChange(e)
        setFormData(newFormData)
    }

    useEffect(() => {
        validationSchema.isValid(formData).then(isValid => {
            setButtonDisabled(!isValid)
        })
    
    }, [formData])
    return (
            <div className="container">
                <div className="main">
                    <form onSubmit={onSubmit} className="box">
                        <label htmlFor='name'>Name
                            <input onChange={inputChange} value={formData.name} type="text" id='name' name='name'></input>
                            {errors.name.length > 0 ? <p>{errors.name}</p> :null}
                        </label>
                        <label htmlFor='email'>Email
                            <input onChange={inputChange} value={formData.email} type="text" id='email' name='email'></input>
                            {errors.email.length > 0 ? <p>{errors.email}</p> :null}
                        </label>
                        <label htmlFor='password'>Password
                            <input type='password' id='password' name='password' value={formData.password} onChange={inputChange}></input>
                            {errors.password.length > 0 ? <p>{errors.password}</p> :null}
                        </label>
                        <label htmlFor="terms">Terms of Service
                            <input type="checkbox" id="terms" name='terms'
                            value={formData.terms} onChange={inputChange} ></input>
                            {errors.terms.length > 0 ? <p>{errors.terms}</p> :null}
                        </label>  
                        <button disabled={buttonDisabled} type="submit">Submit</button>
                        <pre>{JSON.stringify(users, null, 2)}</pre>
                    </form>

                </div>
            </div>
        )

 }
export default Form
