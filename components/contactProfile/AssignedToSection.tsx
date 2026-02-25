import Select from "@/components/Select";
import { icons } from "@/constants";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { Image, Text, View } from "react-native";

interface AssignedToSectionProps {
    role?: string;
    assignTo?: string;
    agentList: UseQueryResult<AgentList[], any>;
    assignAgent: UseMutationResult<any, any, { agent_id: number }, unknown>;
}

const AssignedToSection = ({ role, assignTo, agentList, assignAgent }: AssignedToSectionProps) => {
    return (
        <View className="gap-2.5">
            <View className="flex flex-row items-center gap-2 px-1">
                <View className="w-1 h-4 bg-blue-500 rounded-full" />
                <Text className="text-sm font-JakartaBold text-gray-800">
                    Assigned To
                </Text>
            </View>

            {role === "user" ? (
                <Select
                    value={assignTo?.toString()!}
                    onValueChange={(value) => assignAgent.mutate({ agent_id: parseInt(value) })}
                    options={agentList.data?.map((opt) => ({ value: opt.id.toString(), label: opt.name })) || []}
                    placeholder={assignAgent.isPending ? "Assigning..." : "Select an option"}
                    label=""
                    modalTitle="Select an Agent"
                />
            ) : (
                assignTo ? (
                    <View className="flex flex-row gap-3 items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <View className="size-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Text className="font-JakartaBold text-lg text-blue-600">
                                {agentList.data?.find((agent) => agent?.id === parseInt(assignTo))?.name.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        <Text className="font-JakartaSemiBold text-gray-800 text-base">
                            {agentList.data?.find((agent) => agent?.id === parseInt(assignTo))?.name}
                        </Text>
                    </View>
                ) : (
                    <View className="flex flex-row gap-3 items-center p-4 bg-white border border-dashed border-gray-300 rounded-2xl">
                        <Image source={icons.failed as any} className="size-5" tintColor={'#9ca3af'} />
                        <Text className="text-gray-500 font-JakartaMedium">No Agent Assigned</Text>
                    </View>
                )
            )}
        </View>
    );
};

export default AssignedToSection;
