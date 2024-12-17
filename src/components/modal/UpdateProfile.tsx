import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useUpdateProfile } from "@/src/hooks/profile";
import { logOut } from "@/src/services/Auth";
import { useUser } from "@/src/context/user.provider";
import { useRouter } from "next/navigation";
import { TbFidgetSpinner } from "react-icons/tb";

export default function UpdateProfile() {
  const { user } = useUser();
  const router = useRouter();
  const { setIsUserLoading } = useUser();
  const { handleSubmit, register, reset } = useForm();
  const [image, setImage] = useState<File | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutate: updateProfile, isPending, isSuccess } = useUpdateProfile();

  const handleUpdateProfile: SubmitHandler<FieldValues> = (value) => {
    const payload = { name: value?.name };
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (image) {
      formData.append("file", image);
    }
    updateProfile(formData, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message);
          logOut();
          setIsUserLoading(true);
          reset();
          setImage(null);
          router.push("/login");
          onClose();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImage(files[0]);
    }
  };

  useEffect(() => {
    reset({
      name: user?.name,
    });
  }, [user]);

  return (
    <>
      <Button onPress={onOpen}>Update Profile</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
              <ModalHeader className="flex flex-col gap-1">
                Update Profile
              </ModalHeader>
              <ModalBody>
                <Input
                  {...register("name", { required: true })}
                  label="Name"
                  placeholder="Enter Name"
                  variant="bordered"
                />

                <div className="mt-4">
                  <label htmlFor="Image" className="text-xs">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    name="imageUrl"
                    id="upload"
                    className="hidden"
                    multiple
                  />
                  <div className="w-full flex items-center flex-wrap">
                    <label htmlFor="upload">
                      <AiOutlinePlusCircle
                        size={30}
                        className="mt-3 cursor-pointer"
                        color="#555"
                      />
                    </label>
                    {image && (
                      <Image
                        height={120}
                        width={120}
                        src={URL.createObjectURL(image)}
                        alt="Image"
                        className="h-[120px] w-[120px] object-cover m-2"
                      />
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-500 text-white hover:bg-orange-600"
                >
                  {isPending && !isSuccess ? (
                    <span className="flex items-center gap-2 justify-center text-base">
                      <span>Please Wait</span>{" "}
                      <TbFidgetSpinner className="animate-spin" />
                    </span>
                  ) : (
                    <span> Update</span>
                  )}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
