"use client"

import React, { useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import styles from "./filter-select.module.css"

interface FilterSelectProps {
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string; count?: number }[]
  placeholder?: string
  className?: string
}

export function FilterSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  className,
}: FilterSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div ref={selectRef} className={`${styles.select} ${className || ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.select__trigger} ${isOpen ? styles["select__trigger--open"] : ""}`}
      >
        <span
          className={`${styles.select__triggerText} ${!selectedOption ? styles["select__triggerText--placeholder"] : ""}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`${styles.select__icon} ${isOpen ? styles["select__icon--open"] : ""}`} />
      </button>

      <div className={`${styles.select__dropdown} ${isOpen ? styles["select__dropdown--open"] : ""}`}>
        <div className={styles.select__dropdownContent}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange(option.value)
                setIsOpen(false)
              }}
              className={`${styles.select__option} ${value === option.value ? styles["select__option--selected"] : ""}`}
            >
              <span>
                {option.label}
                {option.count !== undefined && (
                  <span className={styles.select__optionCount}>({option.count})</span>
                )}
                </span>
              {value === option.value && <Check className={styles.select__checkIcon} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
