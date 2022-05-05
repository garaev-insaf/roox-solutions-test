import React from 'react'
import { useState, useContext, createContext, useMemo } from 'react'
const SidebarContext = createContext(null)

const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error(`useCount must be used within a CountProvider`)
    }
    return context
}

const SidebarProvider = (props) => {
    const [showSidebar, setShowSidebar] = useState(() => false); 
    const value = useMemo(() => ({
        // в данном контексте мемоизация действительна важна, т.к. в компонентах компонентной части мы используем лишь состояние, не изменяя его
        showSidebar, setShowSidebar
    }), [showSidebar])
    return <SidebarContext.Provider value={value} {...props} />
}

export { SidebarProvider, useSidebar }