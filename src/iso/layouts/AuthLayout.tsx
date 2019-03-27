import { Button, Divider, Empty, PageHeader } from "antd";
import * as React from "react";
import { useInstance } from "react-ioc";
import { withRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import { StoreService } from "../../iso/services/StoreService";
import { UserService } from "../../iso/services/UserService";

export const AuthLayout = withRouter((props) => {
    const storeService = useInstance(StoreService);
    const userService = useInstance(UserService);
    console.log(userService.user);
    return !userService.user
        ? <div>
            <PageHeader
                // onBack={() => null}
                title="Todo"
                subTitle="Authentification"
            />
            <Divider>You need auth with Google</Divider>
            <Empty
                image="http://pngimg.com/uploads/google/google_PNG19635.png"
                description={
                <span>
                    It's better than remember a new password
                </span>
                }
            >
                <Button type="primary" href={
                    storeService.isDev
                        ? "/auth/development/login?username=dev&password=dev"
                        : "/auth/google/login"
                }>Login</Button>
            </Empty>
        </div>
        : <div>
            <PageHeader
                onBack={() => {
                    const url = storeService.isDev
                        ? "/auth/development/logout"
                        : "/auth/google/logout";
                    window.location.href = url;
                }}
                title="Todo"
                // subTitle="What's your plan for today?"
            />
            {renderRoutes(props.route.routes)}
        </div>;
});
