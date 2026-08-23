"use client";

import React from "react";
import { Card, Typography } from "antd";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";

const { Text } = Typography;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CommunityPostCard({ post }: { post: any }) {
  return (
    <Card
      size="small"
      className="rounded-xl"
      styles={{ body: { padding: "12px 12px" } }}
    >
      <div className="flex gap-3">
        {/* 프로필 썸네일 */}
        <div
          className="rounded-full bg-gray-200"
          style={{ width: 44, height: 44 }}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Text strong>{post.author}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {post.createdAt}
            </Text>
          </div>

          <div className="mt-1">
            <Text strong>{post.title}</Text>
          </div>

          <div className="mt-1">
            <Text type="secondary" style={{ fontSize: 13 }}>
              {post.content}
            </Text>
          </div>

          <div className="mt-2 flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <HeartOutlined />
              {post.likes}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <MessageOutlined />
              {post.comments}
            </span>

            {post.category && (
              <span className="ml-auto text-xs text-gray-400">
                {post.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
