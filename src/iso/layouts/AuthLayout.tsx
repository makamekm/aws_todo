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
    return !userService.user
        ? <div>
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
            {renderRoutes(props.route.routes)}
        </div>;
});
