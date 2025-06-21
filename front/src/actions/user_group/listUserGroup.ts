import { auth } from "@/lib/auth/auth";
import { notFound, redirect } from "next/navigation";
import { UserGroupListItem, UserGroupListViewModel } from "@/types/user_group/viewmodel"
import { Role } from "@/types/event/role";


type MockUserGroup = {
  id: number;
  name: string;
  description: string;
  role: Role;
}

// モックデータ
// ... existing code ...

const mockUserGroups: MockUserGroup[] = [
    {
      id: 1,
      name: "初学者の会",
      description: "プログラミング初学者を対象にしたグループ",
      role: "admin",
    },
    {
      id: 2,
      name: "Tokyo Hackathon",
      description: "ハッカソンイベントをする団体",
      role: "admin",
    },
    // Additional mock data
    {
      id: 3,
      name: "Advanced Coders",
      description: "A group for advanced programming enthusiasts",
      role: "member",
    },
    {
      id: 4,
      name: "AI Innovators",
      description: "Exploring the latest in AI technology",
      role: "admin",
    },
    {
      id: 5,
      name: "Web Dev Wizards",
      description: "Focusing on modern web development practices",
      role: "member",
    },
    {
      id: 6,
      name: "Data Science Gurus",
      description: "Data science and machine learning discussions",
      role: "admin",
    },
    {
      id: 7,
      name: "Mobile App Creators",
      description: "Building the next generation of mobile apps",
      role: "member",
    },
    {
      id: 8,
      name: "Game Developers",
      description: "Creating immersive gaming experiences",
      role: "admin",
    },
    {
      id: 9,
      name: "Cloud Computing Group",
      description: "Exploring cloud technologies and solutions",
      role: "member",
    },
    {
      id: 10,
      name: "Cybersecurity Experts",
      description: "Discussing the latest in cybersecurity",
      role: "admin",
    },
    {
      id: 11,
      name: "Blockchain Enthusiasts",
      description: "Exploring blockchain and cryptocurrency",
      role: "member",
    },
    {
      id: 12,
      name: "IoT Innovators",
      description: "Internet of Things and smart devices",
      role: "admin",
    },
    {
      id: 13,
      name: "VR/AR Pioneers",
      description: "Virtual and augmented reality technologies",
      role: "member",
    },
    {
      id: 14,
      name: "DevOps Masters",
      description: "Best practices in DevOps and CI/CD",
      role: "admin",
    },
    {
      id: 15,
      name: "Startup Founders",
      description: "Networking for tech startup founders",
      role: "member",
    },
    {
      id: 16,
      name: "Tech Bloggers",
      description: "Writing and sharing tech insights",
      role: "admin",
    },
    {
      id: 17,
      name: "Open Source Contributors",
      description: "Contributing to open source projects",
      role: "member",
    },
    {
      id: 18,
      name: "Robotics Engineers",
      description: "Building and programming robots",
      role: "admin",
    },
    {
      id: 19,
      name: "Quantum Computing Group",
      description: "Exploring quantum computing technologies",
      role: "member",
    },
    {
      id: 20,
      name: "Tech Educators",
      description: "Teaching and mentoring in tech",
      role: "admin",
    },
    {
      id: 21,
      name: "Digital Nomads",
      description: "Tech professionals working remotely",
      role: "member",
    },
    {
      id: 22,
      name: "Bioinformatics Group",
      description: "Intersection of biology and data science",
      role: "admin",
    },
    {
      id: 23,
      name: "E-commerce Innovators",
      description: "Building the future of online shopping",
      role: "member",
    },
    {
      id: 24,
      name: "Tech Investors",
      description: "Investing in tech startups and innovations",
      role: "admin",
    },
    {
      id: 25,
      name: "SaaS Developers",
      description: "Developing software as a service solutions",
      role: "member",
    },
    {
      id: 26,
      name: "Tech Event Organizers",
      description: "Organizing tech meetups and conferences",
      role: "admin",
    },
    {
      id: 27,
      name: "Green Tech Innovators",
      description: "Technology for environmental sustainability",
      role: "member",
    },
    {
      id: 28,
      name: "Tech Policy Advocates",
      description: "Advocating for tech policy and regulation",
      role: "admin",
    },
    {
      id: 29,
      name: "Digital Artists",
      description: "Creating art with digital tools",
      role: "member",
    },
    {
      id: 30,
      name: "Tech Historians",
      description: "Exploring the history of technology",
      role: "admin",
    },
  ];

  // ... existing code ...

/**
 * イベント一覧用のビューモデルを取得する
 * @returns イベント一覧用のビューモデル
 */
export const getUserGroupListViewModel = async (): Promise<UserGroupListViewModel> => {
  const session = await auth();
  if (!session?.user) {
    redirect('/user/register');
  }
  if (!session.user.email) {
    notFound();
  }

  // TODO: 現時点ではモックデータを使用しているが、データベースから取得するようにする
  const userGroups = mockUserGroups;

  // イベントの一覧をビューモデルに変換
  const userGroupListItems: UserGroupListItem[] = userGroups.map((userGroup) => ({
    id: userGroup.id.toString(),
    name: userGroup.name,
    description: userGroup.description,
    role: userGroup.role,
  }));

  return {
    userGroups: userGroupListItems,
  };
};