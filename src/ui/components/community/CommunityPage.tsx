"use client";

import React, { useMemo, useState } from "react";
import { Tabs, Typography, Input, Segmented, Empty } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import CommunityPostCard from "./CommunityPostCard";
import WritePostModal from "./WritePostModal";
import StyleMagazineSection from "./StyleMagazineSection";
import CategoryChips from "./CategoryChips";

const { Title, Text } = Typography;

type BoardKey = "style" | "promo";
type SortKey = "recent" | "hot";

const STYLE_CATEGORIES = [
  { key: "hot", label: "인기글" },
  { key: "style", label: "스타일" },
  { key: "reform", label: "리폼 꿀팁" },
  { key: "question", label: "패션 질문" },
  { key: "news", label: "패션 소식" },
  { key: "magazine", label: "유행 매거진" },
];

const dummyMagazine = [
  {
    id: 1,
    title: "버려진 옷으로\n쉽게 가방 만들기",
    likes: 109,
    comments: 8,
    thumbnail: "/assets/products/mock/product-05.png",
  },
  {
    id: 2,
    title: "최근 유행이 지난\n패션을 재미있게 입기",
    likes: 145,
    comments: 9,
    thumbnail: "/assets/products/mock/product-03.png",
  },
  {
    id: 3,
    title: "요즘 남자 코디\n레퍼런스 모음",
    likes: 88,
    comments: 2,
    thumbnail: "/assets/products/mock/product-06.png",
  },
];

const dummyStylePosts = [
  {
    id: 11,
    author: "해외여행 샵",
    title: "이번 주 제일 예쁜 코디는?",
    content: "가을 무드로 레이어드 해봤는데 피드백 부탁!",
    createdAt: "1분 전",
    likes: 32,
    comments: 3,
    category: "스타일",
  },
  {
    id: 12,
    author: "핏루프 운영팀",
    title: "리폼할 때 실수 줄이는 팁",
    content: "시접, 원단 방향 먼저 체크하면 실패 확 줄어요.",
    createdAt: "5분 전",
    likes: 67,
    comments: 1,
    category: "리폼 꿀팁",
  },
  {
    id: 13,
    author: "onStyle",
    title: "요즘 유행 컬러 정리",
    content: "2025 F/W는 차콜, 버건디가 강세래요.",
    createdAt: "12분 전",
    likes: 120,
    comments: 10,
    category: "패션 소식",
  },
  {
    id: 14,
    author: "초보코디",
    title: "이 바지에 어울리는 상의 뭐가 좋을까요?",
    content: "와이드 데님인데 상의 고민이에요.",
    createdAt: "20분 전",
    likes: 8,
    comments: 6,
    category: "패션 질문",
  },
];

const dummyPromoPosts = [
  {
    id: 101,
    author: "해외여행 샵",
    title: "리폼 클래스 모집",
    content: "이번달 2회차 모집합니다.",
    createdAt: "1분 전",
    likes: 12,
    comments: 0,
    category: "홍보",
  },
  {
    id: 102,
    author: "핏루프 운영팀",
    title: "오프라인 팝업 안내",
    content: "주말에 성수에서 만나요.",
    createdAt: "10분 전",
    likes: 98,
    comments: 11,
    category: "홍보",
  },
];

export default function CommunityPage() {
  const [activeBoard, setActiveBoard] = useState<BoardKey>("style");
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [search, setSearch] = useState("");
  const [writeOpen, setWriteOpen] = useState(false);

  const [styleCategory, setStyleCategory] = useState<string>("hot");

  const posts = useMemo(() => {
    const base = activeBoard === "style" ? dummyStylePosts : dummyPromoPosts;

    let filtered = base.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase())
    );

    if (activeBoard === "style" && styleCategory !== "hot") {
      const map: Record<string, string> = {
        style: "스타일",
        reform: "리폼 꿀팁",
        question: "패션 질문",
        news: "패션 소식",
        magazine: "유행 매거진",
      };
      filtered = filtered.filter((p) => p.category === map[styleCategory]);
    }

    if (sortKey === "hot") {
      filtered = [...filtered].sort((a, b) => b.likes - a.likes);
    } else {
      filtered = [...filtered].sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [activeBoard, sortKey, search, styleCategory]);

  return (
    <div className="pb-24">
      <div className="px-4 pt-4 pb-2">
        <Title level={4} style={{ margin: 0 }}>
          커뮤니티
        </Title>
        <div className="mt-3">
          <Input
            allowClear
            placeholder="게시글 검색"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        activeKey={activeBoard}
        onChange={(key) => setActiveBoard(key as BoardKey)}
        items={[
          {
            key: "style",
            label: "스타일 정보",
            children: (
              <div className="px-4">
                <SectionHeader
                  title="리폼 & 유행 매거진"
                  rightText="더보기 >"
                />
                <StyleMagazineSection items={dummyMagazine} />

                <CategoryChips
                  categories={STYLE_CATEGORIES}
                  value={styleCategory}
                  onChange={setStyleCategory}
                />

                <div className="flex justify-end py-2">
                  <Segmented
                    size="small"
                    value={sortKey}
                    onChange={(v) => setSortKey(v as SortKey)}
                    options={[
                      { label: "최신순", value: "recent" },
                      { label: "인기순", value: "hot" },
                    ]}
                  />
                </div>

                {posts.length === 0 ? (
                  <div className="py-12">
                    <Empty description="게시글이 없습니다." />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 pb-4">
                    {posts.map((post) => (
                      <CommunityPostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            ),
          },
          {
            key: "promo",
            label: "홍보게시판",
            children: (
              <div className="px-4 pb-4">
                <div className="flex justify-end py-2">
                  <Segmented
                    size="small"
                    value={sortKey}
                    onChange={(v) => setSortKey(v as SortKey)}
                    options={[
                      { label: "최신순", value: "recent" },
                      { label: "인기순", value: "hot" },
                    ]}
                  />
                </div>

                {posts.length === 0 ? (
                  <div className="py-12">
                    <Empty description="게시글이 없습니다." />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {posts.map((post) => (
                      <CommunityPostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />

      <button
        onClick={() => setWriteOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg"
        style={{
          width: 56,
          height: 56,
          background: "#111",
          color: "#fff",
        }}
        aria-label="글쓰기"
      >
        <PlusOutlined style={{ fontSize: 22 }} />
      </button>

      <WritePostModal
        open={writeOpen}
        onClose={() => setWriteOpen(false)}
        defaultBoard={activeBoard}
      />
    </div>
  );
}

function SectionHeader({
  title,
  rightText,
}: {
  title: string;
  rightText?: string;
}) {
  return (
    <div className="flex items-center justify-between mt-2 mb-2">
      <Text strong>{title}</Text>
      {rightText && (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {rightText}
        </Text>
      )}
    </div>
  );
}
