import { useAuthContext } from "hooks/authentication";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const withAuthentication = (WrappedComponent: React.FunctionComponent) => {
    const AuthComponent = (props: any) => {
        const { isAuthenticated, loading } = useAuthContext()
        const Router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) Router.push("/signin");
        }, [isAuthenticated]);

        return !loading && isAuthenticated ? <WrappedComponent {...props} /> : <div>Loading...</div>;
    };
    return AuthComponent;
};

export default withAuthentication;