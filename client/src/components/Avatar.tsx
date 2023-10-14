interface avatarProps {
  size?: string;
  src: string;
}

const Avatar = ({ size = "32px", src }: avatarProps) => {
  return (
    <div
      className="rounded-full overflow-hidden bg-gray-200"
      style={{ width: size, height: size }}>
      <img src={src} alt="profile-image" />
    </div>
  );
};

export default Avatar;
