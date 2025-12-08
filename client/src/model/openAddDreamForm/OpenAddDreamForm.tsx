import { createContext, useState } from "react"

const AddFormContext = createContext({
toggleAddDreamForm: false,
    handleToggleAddDreamForm: () => { }
})

const AddDreamFormProvider = ({ children }: { children: React.ReactNode }) => {
    const [ toggleAddDreamForm,setToggleAddDreamForm ] = useState(false);
    const handleToggleAddDreamForm = () => { setToggleAddDreamForm(!toggleAddDreamForm) };
    return (
        <AddFormContext.Provider value={{ toggleAddDreamForm, handleToggleAddDreamForm }}>
            {children}
        </AddFormContext.Provider>
    )
}

export { AddFormContext, AddDreamFormProvider }
