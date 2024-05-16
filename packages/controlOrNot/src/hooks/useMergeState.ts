import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T
    value?: T
    onChange?: (value: T) => void
  },
): [T, Dispatch<SetStateAction<T>>] {
  const { defaultValue, value: propsValue, onChange } = props || {}

  const isFirstRenderRef = useRef(true)

  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) {
      return propsValue
    } else if (defaultValue !== undefined) {
      return defaultValue
    } else {
      return defaultStateValue
    }
  })

  useEffect(() => {
    if (propsValue === undefined && !isFirstRenderRef.current) {
      setStateValue(propsValue)
    }
    isFirstRenderRef.current = false
  }, [propsValue])

  // eslint-disable-next-line @typescript-eslint/ban-types
  const isFunction = (value: unknown): value is Function =>
    typeof value === 'function'

  const setState = useCallback(
    (value: SetStateAction<T>) => {
      const res = isFunction(value) ? value(stateValue) : value
      if (propsValue === undefined) {
        setStateValue(res)
      }
      onChange && onChange(res)
    },
    [stateValue],
  )

  const mergedValue = propsValue === undefined ? stateValue : propsValue

  return [mergedValue, setState]
}
