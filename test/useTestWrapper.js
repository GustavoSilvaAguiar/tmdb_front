import {mountSuspended} from "@nuxt/test-utils/runtime"

export function useTestWrapper() {
    const mountComponent = (component, options = {}) => {
        const mergedOptions = {
            global: {
                ...options.global
            },
            props: options.props || {},
            slots: options.slots || {},
            shallow: options.shallow || false
        }

        return mountSuspended(component, mergedOptions)
    }

    return {
        mountComponent
    }
}