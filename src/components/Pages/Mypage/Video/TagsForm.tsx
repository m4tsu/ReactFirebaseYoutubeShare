import React, { FC, useState, useContext, useEffect } from "react";
import Creatable from "react-select/creatable";
import { components } from "react-select";
import { TagsContext } from "context";
import styled from "styled-components";

type TagOption = {
  label: string;
  value: string;
};

type TagFormProps = {
  setVideoTags: React.Dispatch<React.SetStateAction<string[]>>;
  initialTags?: string[];
};

const Menu = (props: any) => {
  const optionSelectedLength = props.getValue().length || 0;

  return (
    <components.Menu {...props}>
      {optionSelectedLength < 5 ? (
        props.children
      ) : (
        <div style={{ margin: 15 }}>登録できるタグは5つまでです</div>
      )}
    </components.Menu>
  );
};

export const TagsForm: FC<TagFormProps> = ({ setVideoTags, initialTags }) => {
  const [selectedTagOptions, setSelectedTagOptions] = useState<TagOption[]>([]);
  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
  // const [isValidNewOption, setIsValidNewOption] = useState(true);
  const [newTag, setNewTag] = useState<string>("");
  const { tags, tagsLoading } = useContext(TagsContext);
  console.log(tags);
  console.log(selectedTagOptions);
  console.log(tagOptions);

  const isValidNewOption = (inputValue: any, selectValue: any) =>
    inputValue.length > 0 && selectValue.length < 5;

  useEffect(() => {
    if (initialTags) {
      const options: TagOption[] = initialTags.map((tag) => ({
        label: tag,
        value: tag,
      }));
      setSelectedTagOptions(options);
    }
  }, [initialTags]);

  useEffect(() => {
    setTagOptions(
      tags.map((tag) => {
        return {
          label: tag.label,
          value: tag.label,
        };
      })
    );
  }, [tags]);

  useEffect(() => {
    setVideoTags(
      selectedTagOptions.map((selectedTagOption) => selectedTagOption.label)
    );
  }, [selectedTagOptions, setVideoTags]);

  const handleChange = (value: any): void => {
    if (value) {
      setSelectedTagOptions(value.slice(0, 5));
    } else {
      setSelectedTagOptions([]);
    }
  };

  const handleInputChange = (inputValue: string): void => {
    setNewTag(inputValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (newTag == null) {
      return;
    }

    switch (event.key) {
      case "Enter":
      case "Tab":
        setNewTag("");
        setSelectedTagOptions(
          [...selectedTagOptions, { label: newTag, value: newTag }].slice(0, 5)
        );
        event.preventDefault();
        break;
      default:
    }
  };

  return (
    <Creatable
      components={{ Menu }}
      inputValue={newTag}
      isClearable
      isMulti
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      value={selectedTagOptions}
      options={tagOptions}
      isValidNewOption={isValidNewOption}
      placeholder="タグを追加できます"
    />
  );
};
