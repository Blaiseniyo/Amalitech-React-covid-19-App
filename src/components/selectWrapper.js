import React from "react"
import { TextField,CircularProgress} from "@material-ui/core"
// import {useField,useFormikContext} from "formik"
import { useDispatch } from "react-redux";
import Autocomplete from '@material-ui/lab/Autocomplete';

const SelectWrapper = ({values,name,label,options,setProjectId,setInstitutionId,setFormData,action,defaultValue,keyWord,loading,dependence,...otherProps})=>{
    // const {setFieldValue}= useFormikContext();
    // const [field,meta]= useField(name)
    // const dispatch = useDispatch();
    // console.log(values)
    // const handleChange=(e,value)=>{
    //     if(value)setFieldValue(name,value.id);
    //     if(dependence){
    //         let value=values
    //         value.dependence=""
    //         setFormData(value)
    //     }
        
    //     if(setProjectId && value)  setProjectId(value.id)
    //     if(setInstitutionId && value) setInstitutionId(value.id)
    //     if(action && value) dispatch(action(value.id))
  
    // }
    // const configSelect = {
    // }
    // if(meta && meta.touched && meta.error){
    //     configSelect.error=true;
    //     configSelect.helperText=meta.error;
    // }
    return(
        <Autocomplete
            id="asynchronous-demo"
            name={name}
            options={options}
            getOptionLabel={option => option[keyWord]}
            defaultValue={defaultValue} 
            style={{ width: "100%" }}
            autoHighlight
            // loading={loading}
            // onChange={handleChange}
            renderInput={params => (
              <TextField
                variant="outlined"
                margin="normal"
                label={`${label}`}
                fullWidth
                name={name}
                {...params}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                    <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </React.Fragment>
                    ),
                }}
              />
            )}
          />
    )
}

export default SelectWrapper;