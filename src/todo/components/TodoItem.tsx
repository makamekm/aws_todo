import { List, Popconfirm, Spin, Typography } from "antd";
import * as React from "react";
import { useInstance } from "react-ioc";
import { TodoService } from "../services/TodoService";

export const TodoItem = ({item}) => {
    const { useItemService } = useInstance(TodoService);
    const { loading, toggleTodo, deleteTodo, editTodo } = useItemService(item);

    return (
        <Spin spinning={loading}>
            <List.Item actions={
                [
                    <a
                        onClick={toggleTodo}
                    >
                        toggle
                    </a>,
                    <Popconfirm
                        title="Are you sure to remove?"
                        onConfirm={deleteTodo}
                    >
                        <a href="javascript:;" style={{ color: "red" }}>
                            remove
                        </a>
                    </Popconfirm>,
                ]
            }>
                <List.Item.Meta
                    title={
                        <div>
                            <Typography.Text
                                editable={{
                                    onChange: (value) => editTodo(value),
                                }}
                                style={{
                                    textDecoration: item.isDone ? "line-through" : null,
                                }}
                            >
                                {item.name}
                            </Typography.Text>
                        </div>
                    }
                />
            </List.Item>
        </Spin>
    );
};
