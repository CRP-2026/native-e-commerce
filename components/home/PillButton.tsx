import type { ReactNode } from 'react';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
  label: string;
  icon: ReactNode;
};

export function PillButton({ label, icon }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row items-center gap-1 rounded-[8px] bg-white px-3 py-[7px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
      <Text className="text-[12px] leading-[16px] text-black">{label}</Text>
      {icon}
    </TouchableOpacity>
  );
}
